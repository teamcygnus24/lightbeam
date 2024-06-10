import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../../../application";

const EditorInfo = () => {

    const { slideInfo, setSlideInfo, displayChange, setDisplayChange, setSlideSelected, currentProject } = useContext(AppContext);

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