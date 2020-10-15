import React, {useState} from 'react';
import './Upload.css';

function Upload() {

    const [desc, setDesc] = useState('');
    const [longdesc, setlongDesc] = useState('');
    const [fee, setFee] = useState('');
    const [imgurl, setImgURL] = useState('');
    const [hosturl, setHostURL] = useState('');
    const [schedule, setSchedule] = useState(false);
    const [name, setName] = useState('');
    //const [categoryselected, setcategoryselected] = useState([]);
    //const [platformselected, setplatformselected] = useState([]);

    const changeScheduleOption = () => {
        setSchedule(!schedule);
    }


    return (
        <div className="upload">
            <div className="upload_options">
                {
                    schedule ? (
                        <button onClick={changeScheduleOption}>Dont Schedule?</button>
                    )
                        : (
                            <button onClick={changeScheduleOption}>Schedule Release?</button>
                        )
                        
                }
            </div>

            {
                schedule ? (
                <div className="upload_form">
                    <form action="http://localhost:8000/schedule" enctype="multipart/form-data" method="post">
                    <label for="datetime">Schedule date and time:</label>
                    <input type="datetime-local" name="datetime" />
                    <div className="name4">
                        <label className="imgl" htmlFor="">AM/PM:</label>
                            <select className="platforms" name="amorpm">
                                <option value="0">AM</option>
                                <option value="1">PM</option>
                            </select>
                    </div>
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
                        <div className="name4">
                            <label className="imgl" htmlFor="">Select category:</label>
                            <select className="categories"  name="category" multiple="multiple">
                                <option value="action">Action</option>
                                <option value="roleplaying">Role Playing</option>
                                <option value="simulation">Simulation</option>
                                <option value="sports">Sports</option>
                                <option value="strategy">Strategy</option>
                            </select>
                        </div>
                        <div className="name4">
                        <label className="imgl" htmlFor="">Select Platform:</label>
                            <select className="platforms" name="platform" multiple="multiple">
                                <option value="Mac">Mac</option>
                                <option value="windows">Windows</option>
                                <option value="Android">Android</option>
                                <option value="iOS">iOS</option>
                                <option value="Linux">Linux</option>
                            </select>
                        </div>
                        <div className="name">
                            <label className="imgl" htmlFor="">Cover Image URL: </label>
                            <input type="url" name="imageURL" onChange={event => setImgURL(event.target.value)} value={imgurl} placeholder="Cover image for the game" required/>
                        </div>
                        <div className="name">
                            <label className="hostl" htmlFor="">Hosted URL<span>(Already Hosted?):</span></label>
                            <input type="url" name="hostURL" onChange={event => setHostURL(event.target.value)} value={hosturl} placeholder="URL to hosted game" />
                        </div>
                            <label className="imgl" htmlFor="">Game files(zip file only):</label>
                            <div className="fileuploadandsubmit">
                                <input id="uploadedFile" type="file" name="zipFile"/>
                            </div>            
                            <button className="create" type="submit" value="Create">Submit</button> 
                  </form>
                  </div>
                ) : (
                    
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
                        <div className="name4">
                            <label className="imgl" htmlFor="">Select category:</label>
                            <select className="categories"  name="category" multiple="multiple">
                                <option value="action">Action</option>
                                <option value="roleplaying">Role Playing</option>
                                <option value="simulation">Simulation</option>
                                <option value="sports">Sports</option>
                                <option value="strategy">Strategy</option>
                            </select>
                        </div>
                        <div className="name4">
                        <label className="imgl" htmlFor="">Select Platform:</label>
                            <select className="platforms" name="platform" multiple="multiple">
                                <option value="Mac">Mac</option>
                                <option value="windows">Windows</option>
                                <option value="Android">Android</option>
                                <option value="iOS">iOS</option>
                                <option value="Linux">Linux</option>
                            </select>
                        </div>
                        <div className="name">
                            <label className="imgl" htmlFor="">Cover Image URL: </label>
                            <input type="url" name="imageURL" onChange={event => setImgURL(event.target.value)} value={imgurl} placeholder="Cover image for the game" required/>
                        </div>
                        <div className="name">
                            <label className="hostl" htmlFor="">Hosted URL<span>(Already Hosted?):</span></label>
                            <input type="url" name="hostURL" onChange={event => setHostURL(event.target.value)} value={hosturl} placeholder="URL to hosted game" />
                        </div>
                            <label className="imgl" htmlFor="">Game files(zip file only):</label>
                            <div className="fileuploadandsubmit">
                                <input id="uploadedFile" type="file" name="zipFile"/>
                            </div>            
                            <button className="create" type="submit" value="Create">Submit</button> 
                    </form>
                </div>     
                )

            }
            
        </div>
    )
}

export default Upload;
