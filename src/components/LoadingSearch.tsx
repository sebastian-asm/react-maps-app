export const LoadingSearch = () => {
  return (
    <div className="bg-white p-1.5 rounded-lg shadow-md w-48 mt-2 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin stroke-purple-600 mx-auto"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="12" y1="6" x2="12" y2="3" />
        <line x1="16.25" y1="7.75" x2="18.4" y2="5.6" />
        <line x1="18" y1="12" x2="21" y2="12" />
        <line x1="16.25" y1="16.25" x2="18.4" y2="18.4" />
        <line x1="12" y1="18" x2="12" y2="21" />
        <line x1="7.75" y1="16.25" x2="5.6" y2="18.4" />
        <line x1="6" y1="12" x2="3" y2="12" />
        <line x1="7.75" y1="7.75" x2="5.6" y2="5.6" />
      </svg>
      <span className="text-purple-600 block mt-1.5 text-sm font-bold">
        Buscando
      </span>
    </div>
  );
};
