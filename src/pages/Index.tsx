import { VaultScene } from '@/components/vault/VaultScene';
import { HeroDOMOverlay } from '@/components/vault/HeroDOMOverlay';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useMousePosition } from '@/hooks/useMousePosition';

const Index = () => {
  const { scrollProgress } = useScrollProgress();
  const { mouseX, mouseY } = useMousePosition();

  return (
    <div className="relative">
      {/* Scroll height spacer — 5x viewport for scroll choreography */}
      <div className="h-[500vh]" />
      
      {/* Fixed 3D Canvas */}
      <VaultScene
        scrollProgress={scrollProgress}
        mouseX={mouseX}
        mouseY={mouseY}
      />
      
      {/* Fixed DOM overlay */}
      <HeroDOMOverlay scrollProgress={scrollProgress} />
    </div>
  );
};

export default Index;
