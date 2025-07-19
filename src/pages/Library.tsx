
import Navbar from '@/components/navbar/Navbar';
import ScriptLibrary from '@/components/scripting/ScriptLibrary';
import PageTransition from '@/components/layout/PageTransition';
import GridBackground from '@/components/ui/grid-background';
import Particles from '@/components/ui/particles';

const LibraryPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <GridBackground />
          <Particles quantity={40} />
        </div>
        <Navbar />
        <main className="container px-4 md:px-6 mx-auto pt-28 pb-16 relative z-10">
          <ScriptLibrary />
        </main>
      </div>
    </PageTransition>
  );
};

export default LibraryPage;
