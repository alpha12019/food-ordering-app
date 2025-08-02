import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from "./ui/button"

const LoadingButton=()=>{
    return(
        <Button 
          disabled 
          className="flex-1 text-sm sm:text-base md:text-lg px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 hover:bg-orange-600 transition-all duration-300"
        >
            <ReloadIcon className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
            Please wait
        </Button>
    )
}
export default LoadingButton