import * as S from "./styles";

import logo from "../../assets/logo.svg";

export function Header() {
  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <img src={logo} alt="" />
        <S.NewTransactionButton>New transaction</S.NewTransactionButton>
      </S.HeaderContent>
    </S.HeaderContainer>
  );
}
