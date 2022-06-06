import './index.css'
function Card(props) {

    return (
        <>
            <div className="Cards">
                <div className="Card">
                    <img src={props.img_src}
                        alt="Artist Profile"
                        className="imgClass"
                    />
                    <p className="Artist Name">{props.artist_name}</p>
                </div>
            </div>
        </>
    )

}

export default Card;