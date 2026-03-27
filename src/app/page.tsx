'use client';
import { BodyContainer } from "@/components/BodyContainer";
import { CardContainer } from "@/components/CardContainer";
import { FormModal } from "@/components/FormModal";
import { ConfirmModal } from "@/components/ConfirmModal"; // NOVO COMPONENTE
import { Header } from "@/components/Header";
import { Table } from "@/components/Table";
import { ITransaction, TotalCard } from "@/types/transaction";
import { useMemo, useState } from "react";

const transactions: ITransaction[] = [
  {
    id: "1",
    title: "Salário",
    price: 5000,
    category: "Trabalho",
    type: "INCOME",
    data: new Date("2024-06-01"),
  },
  // ... (mantive apenas 1 para encurtar, mas pode manter os seus mock data)
];

export default function Home() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [transactionData, setTransactionData] = useState(transactions);
  
  // Novos estados para Edição e Exclusão
  const [editingTransaction, setEditingTransaction] = useState<ITransaction | null>(null);
  const [transactionToDelete, setTransactionToDelete] = useState<ITransaction | null>(null);

  // Função unificada para Adicionar ou Editar
  const handleSaveTransaction = (transaction: ITransaction) => {
    if (editingTransaction) {
      // Atualiza a transação existente
      setTransactionData((prevState) => 
        prevState.map(t => t.id === transaction.id ? transaction : t)
      );
    } else {
      // Adiciona nova
      setTransactionData((prevState) => [...prevState, transaction]);
    }
    closeFormModal();
  };

  // Funções de Exclusão
  const confirmDelete = () => {
    if (transactionToDelete) {
      setTransactionData((prevState) => 
        prevState.filter(t => t.id !== transactionToDelete.id)
      );
      setTransactionToDelete(null);
    }
  };

  // Funções auxiliares para abrir/fechar modais
  const openEditModal = (transaction: ITransaction) => {
    setEditingTransaction(transaction);
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
    setEditingTransaction(null);
  };

  const calculaTotal = useMemo(() => {
    return transactionData.reduce<TotalCard>((acc, transaction) => {
      if (transaction.type === "INCOME") {
        acc.income += transaction.price;
        acc.total += transaction.price;
      } else {
        acc.outcome += transaction.price;
        acc.total -= transaction.price;
      }
      return acc;
    }, { total: 0, income: 0, outcome: 0 })
  }, [transactionData]);
  
  return (
    <div className="h-full min-h-screen">
      <Header handleOpenFormModal={() => setIsFormModalOpen(true)}/>
      <BodyContainer>
         <CardContainer totalValues={calculaTotal} />
         <Table 
            data={transactionData} 
            onEdit={openEditModal} 
            onDelete={(transaction) => setTransactionToDelete(transaction)} 
         />
      </BodyContainer>
      
      {isFormModalOpen && (
        <FormModal 
          closeModal={closeFormModal} 
          title={editingTransaction ? "Editar Transação" : "Criar Transação"} 
          addTransaction={handleSaveTransaction} 
          initialData={editingTransaction} // Passa os dados para preencher o form
        />
      )}

      {/* Modal de Confirmação de Exclusão */}
      {transactionToDelete && (
        <ConfirmModal 
          title="Excluir Transação"
          description={`Tem certeza que deseja excluir a transação "${transactionToDelete.title}"?`}
          onConfirm={confirmDelete}
          onCancel={() => setTransactionToDelete(null)}
        />
      )}
    </div>
  );
}