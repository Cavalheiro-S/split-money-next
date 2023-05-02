import { Record } from "@/components/Record/Record";
import { SearchBar } from "@/components/SearchBar/SearchBar";

export default function Home() {

  const mockFirstTable = {
    title: "Últimos Lançamentos",
    row: [
      {
        "Nome": "Ifood",
        "Categoria": "Alimentação",
        "Valor": "R$ 34,45"
      },
      {
        "Nome": "Ifood",
        "Categoria": "Alimentação",
        "Valor": "R$ 34,45"
      },
    ]
  }

  const mockSecondTable = {
    title: "Últimas Despesas Lançadas",
    row: []
  }

  return (
    <>
      <SearchBar />
      <Record {...mockFirstTable} />
      <Record {...mockSecondTable} />
    </>
  )
}
