import React from 'react'

export default function Button({ children , onClick, disabled}) {
  return (
    <button className="m-2 inline-flex items-center justify-center rounded-xl border border-transparent bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:bg-slate-300" disabled={disabled? disabled : null}>{children}</button>
  )
}
