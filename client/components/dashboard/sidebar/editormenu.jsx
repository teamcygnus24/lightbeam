import React from "react";

const EditorMenu = () => {

    return (
        <div className="buttons">
            <form>
                <div className="type">Type 1:<input type="text" value={InputText_01} onChange={(e) => {
                    setInputText_01(e.target.value);
                    setSlideInfo(prev => ({...prev, text_01: e.target.value}))
                }} placeholder="Example: Food"/></div>
                <div className="alternative">Alternative 1:<input type="text" value={InputText_02} onChange={(e) => {
                    setInputText_02(e.target.value);
                    setSlideInfo(prev => ({...prev, text_02: e.target.value}))
                }}/></div>
                <div className="alternative">Alternative 2:<input type="text" value={InputText_03} onChange={(e) => {
                    setInputText_03(e.target.value);
                    setSlideInfo(prev => ({...prev, text_03: e.target.value}))
                }}/></div>
                <div className="alternative">Alternative 3:<input type="text" value={InputText_04} onChange={(e) => {
                    setInputText_04(e.target.value);
                    setSlideInfo(prev => ({...prev, text_04: e.target.value}))
                }}/></div>
                <div className="type">Type 2:<input type="text" value={InputText_07} onChange={(e) => {
                    setInputText_07(e.target.value);
                    setSlideInfo(prev => ({...prev, text_07: e.target.value}))
                }} placeholder="Example: Drinks"/></div>
                <div className="alternative">Alternative 1:<input type="text" value={InputText_08} onChange={(e) => {
                    setInputText_08(e.target.value);
                    setSlideInfo(prev => ({...prev, text_08: e.target.value}))
                }}/></div>
                <div className="alternative">Alternative 2:<input type="text" value={InputText_09} onChange={(e) => {
                    setInputText_09(e.target.value);
                    setSlideInfo(prev => ({...prev, text_09: e.target.value}))
                }}/></div>
                <button className="move-button" name="Save" type="button" onClick={handleUpdate}>Save Changes</button>
                <button className="move-button" name="Display" type="button" onClick={handleUpdate}>Go To Display
                </button>
                <button className="move-button" name="Back" onClick={backToSlides}>Back</button>
            </form>
        </div>
}