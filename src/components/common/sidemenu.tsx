import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDogFilters } from "@/domains/search/hooks";

interface CollapsableProps {
    title: string;
    children: any;
};

const Collapsable: React.FC<CollapsableProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return <div>
            <div className="flex justify-between">
                <p className="font-semibold">{title}</p>
                <>{isOpen ? <ChevronUp onClick={()=>setIsOpen(false)} /> : <ChevronDown onClick={()=>setIsOpen(true)}/>}</>
            </div>
            {isOpen && <div className="mt-4">
                { children }
            </div>}
        </div>
}

export const SideMenu = () => {
    const {setAgeMaxFilter, setAgeMinFilter} = useDogFilters();
    const [minAge, setMinAge] = useState<string>();
    const [maxAge, setMaxAge] = useState<string>();
    
    const handleAgeUpdate = () => {
        if(minAge) setAgeMinFilter(Number(minAge))
        if(maxAge) setAgeMaxFilter(Number(maxAge))
    };

    return <div className="w-full space-y-8">
        <Collapsable title="Age">
            <div>
                <div className="flex space-x-4">
                    <div>
                        <p>Min</p>
                        <Input type="number" min={0} onChange={(e)=>setMinAge(e.target.value)}/>
                    </div>
                    <div>
                        <p>Max</p>
                        <Input type="number" min={0} onChange={(e)=>setMaxAge(e.target.value)}/>
                    </div>
                </div>
                <Button className="w-full mt-4" onClick={handleAgeUpdate}>Apply</Button>
            </div>
        </Collapsable>
        <Collapsable title="Zip Code">
            <div>
                <div className="flex space-x-4">
                    <Input min={0} className="w-full"/>
                </div>
                <Button className="w-full mt-4">Apply</Button>
            </div>
        </Collapsable>
    </div>
}