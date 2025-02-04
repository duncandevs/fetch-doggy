import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useDogFilters } from "@/domains/search/hooks";
import { Pill } from "./pill";

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
};

export const SideMenu = () => {
    const {setAgeMaxFilter, setAgeMinFilter, filters, addZipcodeFilter, removeZipcodeFilter} = useDogFilters();
    const [minAge, setMinAge] = useState<string | number | undefined>(filters?.ageMin || 0);
    const [maxAge, setMaxAge] = useState<string | number | undefined>(filters?.ageMax || undefined);
    const [zipCode, setZipCode] = useState<string>();
    
    const handleAgeUpdate = () => {
        if(minAge) setAgeMinFilter(Number(minAge));
        if(maxAge) setAgeMaxFilter(Number(maxAge));
    };

    const handleZipCodeUpdate = () => {
        if(zipCode) addZipcodeFilter(zipCode);
    };

    return <div className="w-full space-y-8">
        <Collapsable title="Age">
            <div>
                <div className="flex space-x-4">
                    <div>
                        <p>Min</p>
                        <Input type="number" min={0} onChange={(e)=>setMinAge(e.target.value)} value={minAge}/>
                    </div>
                    <div>
                        <p>Max</p>
                        <Input type="number" min={0} onChange={(e)=>setMaxAge(e.target.value)} value={maxAge}/>
                    </div>
                </div>
                <Button className="w-full mt-4" onClick={handleAgeUpdate}>Apply</Button>
            </div>
        </Collapsable>
        <Collapsable title="Zip Code">
            <div>
                <div className="flex space-x-4">
                    <Input min={0} className="w-full" onChange={(e) => setZipCode(e.target.value)} />
                </div>
                <div className="flex flex-wrap gap-[4px] mt-4">
                    {filters?.zipCodes?.map((value) => 
                        <Pill 
                            key={value} 
                            value={value}
                            className="w-fit text-xs" 
                            deleteHandler={()=>removeZipcodeFilter(value)}
                        />)}
                </div>
                <Button className="w-full mt-4" onClick={handleZipCodeUpdate}>Apply</Button>
            </div>
        </Collapsable>
    </div>
}