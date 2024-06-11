import React, {useContext} from 'react';
import { AppContext } from "../../../application";

const EditorInfo = () => {

    const {setSlideSelected } = useContext(AppContext);

    const backToSlides = async (e) => {
        e.preventDefault();

        setSlideSelected(prev => !prev)
    }

    return (
        <div className="buttons">
            <form>
                <button className="move-button" name="Back" onClick={backToSlides}>Back</button>
            </form>
        </div>
    )
}

export default EditorInfo;