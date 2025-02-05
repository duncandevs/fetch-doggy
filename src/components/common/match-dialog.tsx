import { Heart } from "lucide-react";
import { CenteredDialog,  CenterDialogProps } from "./center-dialog";
import { DogCard } from "./dog-card";
import { Dog } from "@/domains/search/types";
import Confetti from "react-confetti";

type MatchDialog = CenterDialogProps & {
    dog?: Dog
}

export const MatchDialog: React.FC<MatchDialog> = ({dog, ...props }) => {
    if(!dog) return null;

    return <CenteredDialog {...props}>
        {<Confetti className="w-screen" />}
        <div> 
            <div className="flex gap-4 justify-center">
                <Heart className="stroke-none fill-red-500" />
                <h2 className="text-center text-lg font-semibold">You've been Matched!</h2>
            </div>
            <div className="flex justify-center mt-8">
                <DogCard dog={dog} hideFavoriteAction/>
            </div>
        </div>
    </CenteredDialog>
}