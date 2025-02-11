export const Card = () => {
    const card = { 
        holder_name: "Fulano de tal", 
        number: "5636 4563 4896 1463", 
        exp_month: "12", 
        exp_year: "26", 
        cvv: "123"  
    }

    const { holder_name, number, exp_month, exp_year, cvv } = card

    const formatHolderName = () => {
        if (!holder_name) return 'Seu nome'
        if (holder_name.length > 20) {
            return holder_name.slice(0, 20) + '...'
        } else {
            return holder_name
        }
    }

    return (
        <div className='w-full flex gap-2 justify-between md:mt-8'>
             <div className="h-56 md:h-72 flex-1 p-8 rounded-xl text-white bg-[url('/images/pagamentos/card.png')] bg-cover bg-no-repeat flex flex-col justify-end">
                  <span>{number || "0000 0000 0000 0000"}</span>
                  <div className='flex justify-between tracking-widest'>
                      <span className="uppercase text-ellipsis overflow-hidden">{formatHolderName() || "Fulando de Tal"}</span>
                      <span>{exp_month || "00"}/{exp_year || "00"}</span>
                  </div>
              </div>
        </div>
      )
  }