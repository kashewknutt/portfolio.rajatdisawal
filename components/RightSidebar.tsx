import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

const RightSidebar = ({ isDarkMode, setIsDarkMode }: { isDarkMode: boolean; setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const router = useRouter();

  return (
    <div className={`w-auto py-4 h-full ${isDarkMode ? "bg-primaryDark text-textPrimaryDark border-borderPrimaryDark" : "bg-primary text-textPrimary border-borderPrimary"} rounded-lg p-4 shadow-2xl flex flex-col justify-center`}>
      <h2 className="text-lg font-bold mb-4">Hi, I&apos;m Rajat...</h2>
      <p className="text-sm mb-4">
        Welcome to my interactive world! Explore different places to learn more about me.
      </p>
      <p className="text-sm mb-4">Prefer a traditional portfolio instead?</p>
      <Button onClick={() => {router.push('/traditional')}} className="bg-[#a67c52] text-white hover:bg-[#8c5f3b]">Click Me</Button>
      <Button onClick={toggleTheme} className="mt-4 bg-[#a67c52] text-white hover:bg-[#8c5f3b]">
        Toggle {isDarkMode ? "Light" : "Dark"} Mode
      </Button>
      <p className="text-sm mt-6">
        Use <strong>Arrow keys</strong> or <strong>WASD</strong> to move around. Click on entities to interact!
      </p>
      <p className="text-sm mt-4">Made with <Heart className="text-red-400"/> by Rajat Disawal</p>

      <p className="text-xs border border-red-300 rounded-lg px-4 py-2 mt-16">
        <strong>Note:</strong> If any glitches occur or the game isn&apos;t rendering properly, do refresh the page 2-3 times.
      </p>
    </div>
  );
};

export default RightSidebar;
