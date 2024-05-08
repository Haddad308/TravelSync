/* eslint-disable react/prop-types */

export default function Alert({ text }) {
  return (
    <div
      className="flex gap-2  bg-red-100 border mt-5 border-red-400 text-red-700 px-4 py-3 rounded-lg relative"
      role="alert"
    >
      <img
        width={22}
        height={6}
        src="https://static-00.iconduck.com/assets.00/process-error-symbolic-icon-2048x2048-oqfn9h3m.png"
        alt="alert"
      />
      <span className="block sm:inline">{text}</span>
    </div>
  );
}
