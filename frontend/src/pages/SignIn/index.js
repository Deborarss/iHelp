import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/info.svg';

const schema = Yup.object().shape({
  email: Yup.string().email('Insira um e-mail válido').required('O email é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
})

export default function SignIn() {

  const handleSubmit = data => {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="iHelp"/>

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />

        <button type="submit">Acessar</button>
        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  )
}
