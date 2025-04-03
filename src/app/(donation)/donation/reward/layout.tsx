export default function layout({ children }: { children: React.ReactNode }) {

  return (
    <body>
      <div className="bg-white rounded-[40px] drop-shadow-lg">{children}</div>
    </body>
  );
}
