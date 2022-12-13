import React from 'react';
import {useHistory} from 'react-router-dom';

import './styles.css';
import { useState } from 'react';

import api from '../../services/api';

export default function CadastroClamp(){

	const history = useHistory();
	const [m, setMacAddress] = useState('');
	const [description, setDescription] = useState('');

	async function handleCadClamp(e){
		e.preventDefault();

		try{
			await api.post('api/clamp', {m, description});
			
			history.push('/admin');
		} catch(err){
			alert(err);
		}
	}

    return(
        <div class="limiter-login">
		<div class="container-login100">
			<div class="wrap-login100">

				<form class="login100-form validate-form" onSubmit={handleCadClamp}>
					<span class="login100-form-title p-b-26">
						Novo clamp
					</span>

					<div class="wrap-input100 validate-input" data-validate = "mac address">
						<input class="input100" type="text" name="mac address"
						value={m}
						onChange={e => setMacAddress(e.target.value)}/>
						<span class="focus-input100" data-placeholder="mac address"></span>
					</div>
				

					<div class="wrap-input100 validate-input" data-validate="description">
						<span class="btn-show-pass">
							<i class="zmdi zmdi-eye"></i>
						</span>
						<input class="input100" type="text" name="description"
						value={description}
						onChange={e => setDescription(e.target.value)}
						/>
						<span class="focus-input100" data-placeholder="descrição"></span>
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
