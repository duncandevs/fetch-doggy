import Avatar from "boring-avatars";
import { Dog } from "lucide-react";

interface LayoutProps {
    children: any
};

export default function Layout ({ children }: LayoutProps) {
    return <div className="flex flex-col">
        <div className="flex fixed items-center w-full h-16 bg-yellow-100" style={{zIndex: 10}}>
            <div className="ml-4 flex items-center gap-4">
                <Dog height={64} width={48} />
                <p className="text-2xl font-semibold">Doggy</p>
            </div>
            <Avatar size={48} className="ml-auto mr-4" name="Duncan Maina"/>
        </div>
        <div className="mt-16 h-screen">
            {children}
        </div>
    </div>
}