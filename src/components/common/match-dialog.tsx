import { CenteredDialog,  CenterDialogProps } from "./center-dialog";
import { DogCard } from "./dog-card";
import { Dog } from "@/domains/search/types";

type MatchDialog = CenterDialogProps & {
    dog?: Dog
}

export const MatchDialog: React.FC<MatchDialog> = ({dog, ...props }) => {
    if(!dog) return null;

    return <CenteredDialog {...props}>
        <div> 
            <h2 className="text-center">You've been Matched!</h2>
            <div className="m-auto">
                <DogCard dog={dog} />
            </div>
        </div>
    </CenteredDialog>
}