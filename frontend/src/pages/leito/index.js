import React from 'react';
import {useHistory} from 'react-router-dom';

import './styles.css';
import { useState } from 'react';

import api from '../../services/api';

export default function CadastroLeito(){

    const history = useHistory();
	const [bedIdentifier, setBed] = useState('');
	const [clamp, setClamp] = useState('');
        
    async function handleCadLeito(e){
        e.preventDefault();
        
		try{
			if (clamp === "") {
				await api.post('api/bed', {bedIdentifier});
			} else {
				await api.post('api/bed', {bedIdentifier, clamp});
			}
			history.push('/admin');
		} catch(err){
			alert(err);
		}
	}

    return(
        <div class="limiter-login">
		<div class="container-login100">
			<div class="wrap-login100">

				<form class="login100-form validate-form" onSubmit={handleCadLeito}>
					<span class="login100-form-title p-b-26">
						Novo leito
					</span>

					<div class="wrap-input100 validate-input" data-validate = "bed id">
						<input class="input100" type="text" name="bed id"
                        value={bedIdentifier}
                        onChange={e=> setBed(parseInt(e.target.value))}
                        />
						<span class="focus-input100" data-placeholder="identificador do leito"></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate = "clamp id">
						<input class="input100" type="text" name="clamp id"
                        value={clamp}
                        onChange={e=> setClamp(e.target.value)}
                        />
						<span class="focus-input100" data-placeholder="id clamp"></span>
					</div>

					<div class="container-login100-form-btn">
						<div class="wrap-login100-form-btn">
							<div class="login100-form-bgbtn"></div>
							<button class="login100-form-btn" type='submit'>
								cadastrar
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
    );
}