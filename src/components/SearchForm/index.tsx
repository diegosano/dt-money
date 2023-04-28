import { MagnifyingGlass } from "phosphor-react";

import * as S from "./styles";

export function SearchForm() {
  return (
    <S.SearchFormContainer>
      <input type="text" placeholder="Search by transactions" />

      <button type="submit">
        <MagnifyingGlass size={20} />
        Search
      </button>
    </S.SearchFormContainer>
  )
}