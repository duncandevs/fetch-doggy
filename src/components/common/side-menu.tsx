import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

const Collapsable = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return <div>
            <div className="flex justify-between">
                <p>{title}</p>
                <>{isOpen ? <ChevronUp onClick={()=>setIsOpen(false)} /> : <ChevronDown onClick={()=>setIsOpen(true)}/>}</>
            </div>
            {isOpen && <div>
                { children }
            </div>}
        </div>
}

export const SideMenu = () => {
    return <div className="w-full">
        <Collapsable title="Age">
            <p>Set Age</p>
        </Collapsable>
    </div>
}