import React, { useState, useCallback, VFC } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Success, Form, Error, Label, Input, LinkContainer, Button, Header } from './style';
import useInput from './../../hooks/useInput';
import axios from 'axios';
import useSwr from 'swr';
import fetcher from './../../utils/fetcher';

const SignUp = () => {
  const { data, error, revalidate } = useSwr('/api/users', fetcher);

  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [mismatchError, setMismatchError] = useState<string | boolean>('');
  const [signUpError, setSignUpError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setMismatchError(e.target.value === passwordCheck);
    },
    [passwordCheck],
  );

  const onChangePasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      setMismatchError(e.target.value === password);
    },
    [password, mismatchError],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setSignUpError('');
      setSignUpSuccess(false);
      if (mismatchError && nickname && email) {
        axios
          .post('/api/users', {
            email,
            nickname,
            password,
          })
          .then((response) => {
            setSignUpSuccess(true);
          })
          .catch((error) => {
            setSignUpError(error.response.data);
            console.log(error);
          });
      }
    },
    [email, nickname, password, passwordCheck, mismatchError],
  );

  if (data === undefined) {
    return <p>로딩중...</p>;
  }

  if (data) {
    return <Redirect to="/workspace/channel" />;
  }

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </Label>
        <Label id="nickname-label">
          <span>닉네임</span>
          <div>
            <Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
        </Label>
        <Label id="password-check-label">
          <span>비밀번호 확인</span>
          <div>
            <Input
              type="password"
              id="password-check"
              name="password-check"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
            />
          </div>
        </Label>
        {!nickname && <Error>닉네임을 입력해주세요</Error>}
        {!email && <Error>이메일을 입력해주세요</Error>}
        {mismatchError === false && <Error>비밀번호가 일치하지 않습니다</Error>}
        {signUpError && <Error>{signUpError}</Error>}
        {signUpSuccess && <Success>성공하였습니다</Success>}
        <Button type="submit">회원가입</Button>
      </Form>
      <LinkContainer>
        이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default SignUp;
