
import Navbar from '@/components/navbar/Navbar';
import Dashboard from '@/components/dashboard/Dashboard';
import PageTransition from '@/components/layout/PageTransition';

const DashboardPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <Navbar />
        <main className="container px-4 md:px-6 mx-auto pt-28 pb-16">
          <Dashboard />
        </main>
      </div>
    </PageTransition>
  );
};

export default DashboardPage;
