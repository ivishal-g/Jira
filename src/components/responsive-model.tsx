
import { Dialog, DialogContent } from "./ui/dialog";
import { Drawer, DrawerContent } from "./ui/drawer";
import { useMedia } from "react-use";




interface ResponsibveModalProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ResponsiveModel = ({
    children,    
    open,
    onOpenChange
}: ResponsibveModalProps) => {
    const isDesktop = useMedia("(min-width: 1024px)", true);


    if(!isDesktop){
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-w-[85vh]">
                {children}
            </DialogContent>
        </Dialog>
    }

    return(
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>           
                <div className="overflow-auto hide-scrollbar max-h-[85vh] ">
                    {children}
                </div>
            </DrawerContent>

        </Drawer>
    )

}