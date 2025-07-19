
-- Create user profiles table to extend auth.users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  avatar_url TEXT,
  theme TEXT DEFAULT 'dark',
  favorite_scripts TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  is_read BOOLEAN DEFAULT FALSE,
  is_global BOOLEAN DEFAULT FALSE,
  sent_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Notifications policies
CREATE POLICY "Users can view their own notifications and global ones" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id OR is_global = TRUE);

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can insert notifications" ON public.notifications
  FOR INSERT WITH CHECK (TRUE); -- We'll handle admin checks in the application

-- Create system_status table
CREATE TABLE public.system_status (
  id INTEGER PRIMARY KEY DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'operational',
  message TEXT DEFAULT '',
  updated_by TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default system status
INSERT INTO public.system_status (id, status, message) VALUES (1, 'operational', 'All systems operational');

-- Enable RLS on system_status
ALTER TABLE public.system_status ENABLE ROW LEVEL SECURITY;

-- System status policies (readable by all, updatable by admins)
CREATE POLICY "Anyone can view system status" ON public.system_status
  FOR SELECT TO authenticated, anon USING (TRUE);

CREATE POLICY "Admins can update system status" ON public.system_status
  FOR UPDATE USING (TRUE); -- We'll handle admin checks in the application

-- Create license_keys table
CREATE TABLE public.license_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  duration TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  generated_by TEXT,
  used_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  used_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on license_keys
ALTER TABLE public.license_keys ENABLE ROW LEVEL SECURITY;

-- License keys policies
CREATE POLICY "Admins can manage license keys" ON public.license_keys
  FOR ALL USING (TRUE); -- We'll handle admin checks in the application

-- Create activity_logs table
CREATE TABLE public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on activity_logs
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Activity logs policies
CREATE POLICY "Users can view their own activity" ON public.activity_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert activity logs" ON public.activity_logs
  FOR INSERT WITH CHECK (TRUE);

-- Create status_history table
CREATE TABLE public.status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status TEXT NOT NULL,
  message TEXT,
  changed_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on status_history
ALTER TABLE public.status_history ENABLE ROW LEVEL SECURITY;

-- Status history policies
CREATE POLICY "Anyone can view status history" ON public.status_history
  FOR SELECT TO authenticated, anon USING (TRUE);

CREATE POLICY "System can insert status history" ON public.status_history
  FOR INSERT WITH CHECK (TRUE);

-- Create service_statuses table
CREATE TABLE public.service_statuses (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'operational',
  message TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default services
INSERT INTO public.service_statuses (name, status) VALUES 
  ('Authentication', 'operational'),
  ('Database', 'operational'),
  ('Script Execution', 'operational'),
  ('File Storage', 'operational');

-- Enable RLS on service_statuses
ALTER TABLE public.service_statuses ENABLE ROW LEVEL SECURITY;

-- Service statuses policies
CREATE POLICY "Anyone can view service statuses" ON public.service_statuses
  FOR SELECT TO authenticated, anon USING (TRUE);

CREATE POLICY "Admins can update service statuses" ON public.service_statuses
  FOR UPDATE USING (TRUE);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, theme)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'username', NEW.email), 
    COALESCE(NEW.raw_user_meta_data->>'theme', 'dark')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
