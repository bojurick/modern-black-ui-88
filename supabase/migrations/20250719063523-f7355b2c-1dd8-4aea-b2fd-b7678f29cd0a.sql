
-- Create the scripts table without game context
CREATE TABLE public.scripts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  script TEXT,
  verified BOOLEAN DEFAULT false,
  is_patched BOOLEAN DEFAULT false,
  script_type TEXT DEFAULT 'free' CHECK (script_type IN ('free', 'paid')),
  key_required BOOLEAN DEFAULT false,
  key_link TEXT,
  views INTEGER DEFAULT 0,
  slug TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_scripts_title ON public.scripts (title);
CREATE INDEX idx_scripts_script_type ON public.scripts (script_type);
CREATE INDEX idx_scripts_created_at ON public.scripts (created_at DESC);
CREATE INDEX idx_scripts_views ON public.scripts (views DESC);

-- Enable full-text search
CREATE INDEX idx_scripts_search ON public.scripts USING gin(to_tsvector('english', title || ' ' || COALESCE(description, '')));

-- Add Row Level Security
ALTER TABLE public.scripts ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read scripts (public access)
CREATE POLICY "Anyone can view scripts" 
  ON public.scripts 
  FOR SELECT 
  USING (true);

-- Only authenticated users can manage scripts
CREATE POLICY "Authenticated users can manage scripts" 
  ON public.scripts 
  FOR ALL 
  USING (auth.role() = 'authenticated');

-- Add trigger to update updated_at column
CREATE TRIGGER update_scripts_updated_at
  BEFORE UPDATE ON public.scripts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data without game context
INSERT INTO public.scripts (title, script, verified, script_type, views, description) VALUES
('Infinite Jump Script', 'game.Players.LocalPlayer.Character.Humanoid.JumpPower = 100', true, 'free', 1250, 'Allows unlimited jumping functionality'),
('Auto Farm Basic', 'while true do\n  -- farming logic\n  wait(1)\nend', true, 'free', 890, 'Basic auto farming script'),
('Speed Enhancement', 'game.Players.LocalPlayer.Character.Humanoid.WalkSpeed = 50', false, 'free', 2100, 'Increases movement speed'),
('ESP Script', '-- ESP functionality here', true, 'paid', 650, 'Visual enhancement script'),
('Teleport GUI', 'loadstring(game:HttpGet("https://example.com/teleport"))())', true, 'free', 1800, 'Easy teleportation interface'),
('God Mode', 'game.Players.LocalPlayer.Character.Humanoid.MaxHealth = math.huge', false, 'free', 3200, 'Invincibility script'),
('Auto Clicker', 'while true do\n  mouse1click()\n  wait(0.1)\nend', true, 'free', 950, 'Automated clicking functionality'),
('Fly Script', 'loadstring(game:HttpGet("https://example.com/fly"))())', true, 'free', 2800, 'Enables flight functionality'),
('Premium Exploit', '-- Advanced exploit code', true, 'paid', 450, 'Advanced premium script with multiple features');
