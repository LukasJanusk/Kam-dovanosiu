'use client';

export default function SubmitButton() {
  return (
    <button
      className="btn btn-primary"
      onClick={() => console.log('submit clicked')}
    >
      Pateikti
    </button>
  );
}
