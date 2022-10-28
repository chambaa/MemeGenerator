import React, {useState, useEffect} from "react";

export default function Meme() {

    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        url: "https://i.imgflip.com/2hgfw.jpg"
    })

    const [memeImgs, setAllMemeImgs] = useState([])
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(memesData => setAllMemeImgs(memesData.data.memes))
    }, [memeImgs])

    function handleClick() {
        var item = memeImgs[Math.floor(Math.random()*memeImgs.length)];
        setMeme(prevMeme => ({
            ...prevMeme,
            url: item.url
        }))
    }

    function handleForm(event) {
        event.preventDefault();
    }

    function handleTextChange(event) {
        var text = event.target.value;
        setMeme(prevMeme => ({
            ...prevMeme,
            [event.target.name]: text
        }))
        console.log(meme);
    }

    return (
        <main>
            <form className="form" onSubmit={handleForm}>
                <input 
                    type="text" 
                    placeholder="Top text" 
                    className="form--input" 
                    onChange={handleTextChange} 
                    name="topText"
                />
                <input 
                    type="text" 
                    placeholder="Bottom text" 
                    className="form--input" 
                    onChange={handleTextChange} 
                    name="bottomText"
                />
                <button onClick={handleClick} className="form--button">Get a new meme image!</button>
                <div className="meme">
                    <img className="meme--img" src={meme.url} alt="meme" />
                    <h2 className="meme--text top">{meme.topText}</h2>
                    <h2 className="meme--text bottom">{meme.bottomText}</h2>
                </div>
            </form>
        </main>
    )
}