import React, { useState }  from 'react';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

export default function Login(){
	const [user, setUser] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();

	async function handleLogin(e){
		e.preventDefault();

		try{
			const response = await api.post('/api/login', {user, password});

			localStorage.setItem('usuarioId', response.data.userId);
			localStorage.setItem('nome', response.data.name);

			history.push('/admin')
		} catch(err){
			alert(err);
		}
	}

    return(
        <div class="limiter-login">
		<div class="container-login100">
			<div class="wrap-login100">
				<form class="login100-form validate-form" onSubmit ={handleLogin}>
					<span class="login100-form-title p-b-26">
						Bem vindo!
					</span>

					<div class="wrap-input100 validate-input" data-validate = "user">
						<input class="input100" type="text" name="user"
						value={user}
						onChange={e=> setUser(e.target.value)}
						/>
						<span class="focus-input100" data-placeholder="usuário"></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate="password">
						<input class="input100" type="password" name="password"
						value={password}
						onChange={e=> setPassword(e.target.value)}
						/>
						<span class="focus-input100" data-placeholder="senha"></span>
					</div>

					<div class="container-login100-form-btn">
						<div class="wrap-login100-form-btn">
							<div class="login100-form-bgbtn"></div>
			
							<button class="login100-form-btn" type="submit"> entrar </button>
						</div>
					</div>

					<div class="container-singup">
						<span class="txt1">
							não tem acesso? 
						</span>

						<Link class="txt2" to = "/usuario">
							cadastre-se
						</Link>

					</div>
				</form>
			</div>
		</div>
	</div>
    );
}
