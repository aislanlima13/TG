import React  from 'react';
import {useHistory} from 'react-router-dom';

import './styles.css';
import { useState } from 'react';
import api from '../../services/api';

export default function CadastroUsuarios(){

	const history = useHistory();

	const[name, setName] = useState('');
	const[lastName, setLastName] = useState('');
	const[user, setUser] = useState('');
	const[password, setPassword] = useState('');
	const[branch, setBranch] = useState('');
	const[occupation, setOccupation] = useState('');
	const[phone, setPhone] = useState('');
	const[email, setEmail] = useState('');

	async function handleCadUsuario(e){
		e.preventDefault();

		try{
			await api.post('api/user', {name, lastName, user, password, branch, occupation, phone, email});

			history.push('/admin');
		} catch(err){
			alert(err);
		}
	}

    return(
        <div class="limiter-usuario">
		<div class="container-usuario100">	
			<div class="wrap-usuario100">
				<form class="usuario100-form validate-form" onSubmit={handleCadUsuario}>
					<span class="usuario100-form-title p-b-26">
						Novo usuário
					</span>

					<div class="input-group-usuario">
						<div class="wrap-input-usuario100 validate-input" data-validate = "user name">
							<input class="input100" type="text" name="name"
							value={name}
							onChange={e => setName(e.target.value)}
							/>
							<span class="focus-input100" data-placeholder="nome"></span>
						</div>

						<div class="wrap-input-usuario100 validate-input" data-validate="User last name">
							<span class="btn-show-pass">
								<i class="zmdi zmdi-eye"></i>
							</span>
							<input class="input100" type="text" name="last_name"
							value={lastName}
							onChange={e => setLastName(e.target.value)}
							/>
							<span class="focus-input100" data-placeholder="sobrenome"></span>
						</div>
					</div>

					<div class="input-group-usuario">

						<div class="wrap-input-usuario100 validate-input" data-validate="User nickname">
							<span class="btn-show-pass">
									<i class="zmdi zmdi-eye"></i>
							</span>
							<input class="input100" type="text" name="user_nickname"
							value={user}
							onChange={e => setUser(e.target.value)}
								/>
							<span class="focus-input100" data-placeholder="usuário"></span>
						</div>

						<div class="wrap-input-usuario100 validate-input" data-validate="password">
							<span class="btn-show-pass">
								<i class="zmdi zmdi-eye"></i>
							</span>
							<input class="input100" type="password" name="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							/>
							<span class="focus-input100" data-placeholder="senha"></span>
						</div>
					</div>

					<div class="input-group-usuario">
						
						<div class="wrap-input-usuario100 validate-input" data-validate="branch">
							<span class="btn-show-pass">
								<i class="zmdi zmdi-eye"></i>
							</span>
							<input class="input100" type="text" name="branch"
							value={branch}
							onChange={e => setBranch(e.target.value)}
							/>
							<span class="focus-input100" data-placeholder="ramal"></span>
						</div>

						<div class="wrap-input-usuario100 validate-input" data-validate="occupation">
							<span class="btn-show-pass">
								<i class="zmdi zmdi-eye"></i>
							</span>
							<input class="input100" type="text" name="occupation"
							value={occupation}
							onChange={e => setOccupation(e.target.value)}
							/>
							<span class="focus-input100" data-placeholder="ocupação"></span>
						</div>
					</div>

					<div class="input-group-usuario">
						<div class="wrap-input-usuario100 validate-input" data-validate="phone">
							<span class="btn-show-pass">
								<i class="zmdi zmdi-eye"></i>
							</span>
							<input class="input100" type="text" name="phone"
							value={phone}
							onChange={e => setPhone(e.target.value)}
							/>
							<span class="focus-input100" data-placeholder="telefone"></span>
						</div>

						<div class="wrap-input-usuario100 validate-input" data-validate="email">
							<span class="btn-show-pass">
								<i class="zmdi zmdi-eye"></i>
							</span>
							<input class="input100" type="email" name="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							/>
							<span class="focus-input100" data-placeholder="e-mail"></span>
						</div>
					</div>
					<div class="container-usuario100-form-btn">
						<div class="wrap-usuario100-form-btn">
							<div class="usuario100-form-bgbtn"></div>
							<button class="usuario100-form-btn" type="submit">
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
