
type paymentcardProps = {
  text: string;
  payment: number;
};

const PaymentCard = ({ text, payment }: paymentcardProps) => {
  return (
    <div className="flex justify-between bg-white py-4 px-6 mx-4 rounded-4xl">
      <p className="text-black ">{text}</p>
      <h1 className="text-3xl text-secondary font-semibold mt-6">
        {payment.toLocaleString("ko-KR")}
        <span>원</span>
      </h1>
    </div>
  );
};

export default PaymentCard;
