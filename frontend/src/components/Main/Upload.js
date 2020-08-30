import React, {useState} from 'react';
import './Upload.css';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

function Upload() {

    const [desc, setDesc] = React.useState('');
    const [imgurl, setImgURL] = React.useState('');
    const [hosturl, setHostURL] = React.useState('');
    const [name, setName] = React.useState('');
    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState('');

    const newGameHandler = async (event) => {
        console.log('clicked');
        const data = {
            name: name,
            description: desc,
            url: imgurl,
            hosturl: hosturl
        }
        event.preventDefault();
        await fetch('http://localhost:8000/create/game', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Access-Token': 'Bearer ' + localStorage.getItem('Access-Token')
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(finalRes => {
            if (!finalRes._id) {
                console.log(finalRes);
                setResponse(finalRes);
                setOpen(true);
            }else {
                console.log(finalRes);
                setResponse('Game created successfully');
                setOpen(true);  
            }            
        })
        .catch(err => {
            console.log(err);
        })   
    }

    const descriptionHandler = (event) => {
            setDesc(event.target.value);
    }

    return (
        <div className="upload">
                    <Collapse style={{position: 'fixed', zIndex: '1', top: '0', width: '100%'}} in={open}>
                        <Alert
                            severity="success"
                            action={
                                <CloseIcon
                                fontSize="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                                >
                                </CloseIcon>
                                }
                            >
                            {
                                response
                            }
                        </Alert>
                    </Collapse> 
            <div className="uploadhead">
                <h1>CREATE NEW GAME</h1>
            </div>   
                        <div className="coreInfo">
                                <form onSubmit={newGameHandler}>
                                    <div className="name">
                                        <label className="namel" htmlFor="">Name: </label>
                                        <input type="text" onChange={event => setName(event.target.value)} value={name} placeholder="Name of the game" required/>
                                    </div>
                                    <div className="name">
                                        <label className="descl" htmlFor="">Short Description: </label>
                                        <input type="text" onChange={descriptionHandler} value={desc} placeholder="Not more than 54 chars" maxLength="54" required/>
                                    </div>
                                    <div className="name">
                                        <label className="imgl" htmlFor="">Cover Image URL: </label>
                                        <input type="text" onChange={event => setImgURL(event.target.value)} value={imgurl} placeholder="Image URL" required/>
                                    </div>
                                    <div className="name">
                                        <label className="hostl" htmlFor="">Hosted URL<span>(Already Hosted?):</span></label>
                                        <input type="text" onChange={event => setHostURL(event.target.value)} value={hosturl} placeholder="URL to hosted game" />
                                    </div>
                                    <button className="create" type="submit">Create</button>
                                </form>
                        </div>
        </div>
    )
}

export default Upload
