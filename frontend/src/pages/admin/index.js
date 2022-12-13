import React, {useState, useEffect }  from 'react';
import {useHistory} from 'react-router-dom';

import './styles.css';

import api from '../../services/api';
  
    export default function Admin(){
        const history = useHistory();
        const [beds, setBeds] = useState([]);

        useEffect(() => {
            api.get('api/admin').then(response =>{
                setBeds(response.data);
            })
        });

        function handleLogout(){
            localStorage.clear();
            history.push('/');
        }
        
        return(

            <div className="container">

                <div class="topnav">
                    <a class="active" href="#home">Home</a>
                    <a href="../usuario">Usuario</a>
                    <a href="../clamp">Clamp</a>
                    <a href="../leito">Leito</a>
                    <a onClick={handleLogout}>Sair</a>
                </div>

                <div className="profile-container">
                    <ul>
                        {beds.map(bed => (
                            <li key={bed.bedId}>
                                <strong>Leito:</strong>
                                <p>{bed.bedIdentifier}</p>

                                <strong>status:</strong>
                                <p>{bed.clamp != null ? bed.clamp.statusDescription : "sem clamp"}</p>

                                <strong>Última alteração:</strong>
                                <p>{bed.clamp.updateAt != null ? bed.clamp.updateAt : ""}</p><br/>

                                <p>{bed.clamp.description != null ? bed.clamp.description : ""}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
           
        );
    }