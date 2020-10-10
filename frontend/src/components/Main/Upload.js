import React, {useState} from 'react';
import './Upload.css';


function Upload() {

    const [desc, setDesc] = useState('');
    const [longdesc, setlongDesc] = useState('');
    const [fee, setFee] = useState('');
    const [imgurl, setImgURL] = useState('');
    const [hosturl, setHostURL] = useState('');
    const [name, setName] = useState('');



    return (
        <div className="upload">
            <div className="upload_form">
                <form action="http://localhost:8000/create/game" encType="multipart/form-data" method="post">
                    <div className="name">
                        <label className="namel" htmlFor="">Name: </label>
                        <input type="text" placeholder="Name of the game" name="gname" onChange={event => setName(event.target.value)} value={name} placeholder="Name of the game" required/>
                    </div>
                    <div className="name">
                        <label className="descl" htmlFor="">Short Description: </label>
                        <input type="text" name="sdescription" onChange={event => setDesc(event.target.value)} value={desc} placeholder="Not more than 200 chars" maxLength="200" required/>
                    </div>
                    <div className="name2">
                        <label className="descl" htmlFor="">Long Description: </label>
                        <textarea type="text" name="ldescription" onChange={event => setlongDesc(event.target.value)} value={longdesc} placeholder="Description on game(markdown supported)" required/>
                    </div>
                    <div className="name3">
                        <label className="imgl" htmlFor="">Purchase Fee($):</label>
                        <input type="text" name="fee" onChange={event => setFee(event.target.value)} value={fee} placeholder="Leave it blank, if no fee to be incurred" maxLength="10"/>
                    </div>
                    <div className="name">
                        <label className="imgl" htmlFor="">Cover Image URL: </label>
                        <input type="text" name="imageURL" onChange={event => setImgURL(event.target.value)} value={imgurl} placeholder="Cover image for the game" required/>
                    </div>
                    <div className="name">
                        <label className="hostl" htmlFor="">Hosted URL<span>(Already Hosted?):</span></label>
                        <input type="text" name="hostURL" onChange={event => setHostURL(event.target.value)} value={hosturl} placeholder="URL to hosted game" />
                    </div>
                        <label className="imgl" htmlFor="">Game files(zip file only):</label>
                        <div className="fileuploadandsubmit">
                            <input type="file" name="zipFile"/>
                        </div>            
                        <button className="create" type="submit" value="Create">Submit</button> 
                </form>
            </div>
        </div>
    )
}

export default Upload;
