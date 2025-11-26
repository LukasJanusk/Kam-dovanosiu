'use client';
import { Link2Icon } from 'lucide-react';
import { NewItem } from '../schema/item';
import React, { useState } from 'react';

type Props = {
  onSubmit: (item: NewItem) => void;
};
export default function AddItemForm({ onSubmit }: Props) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { name, url, description };
    onSubmit(formData);
    setName('');
    setUrl('');
    setDescription('');
  };
  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl">Dovana</h1>
        <label className="label">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            required
            placeholder="Pavadinimas"
            className="input"
          />
        </label>
        <label className="input">
          <Link2Icon />
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            type="text"
            required
            className="grow"
            placeholder="Nuoroda"
          />
        </label>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Aprašymas</legend>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="textarea h-32"
            placeholder="Aprašymas"
            maxLength={200}
          ></textarea>
          <div className="label">Neprivaloma</div>
        </fieldset>
        <button className="btn btn-primary mt-4 w-full">Pridėti</button>
      </form>
    </div>
  );
}
