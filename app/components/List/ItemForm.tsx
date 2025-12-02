'use client';

import { Link2Icon } from 'lucide-react';
import { NewItem } from '../../schema/item';
import React, { useEffect, useState } from 'react';

type Props = {
  onSubmit: (item: NewItem) => void;
  item?: NewItem;
};
export default function ItemForm({ onSubmit, item }: Props) {
  const [name, setName] = useState(item?.name || '');
  const [url, setUrl] = useState(item?.url || '');
  const [description, setDescription] = useState(item?.description || '');

  useEffect(() => {
    const reset = () => {
      setName(item?.name || '');
      setUrl(item?.url || '');
      setDescription(item?.description || '');
    };

    reset();
  }, [item]);

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
      <form
        className="flex flex-col gap-4 text-base-100"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl text-black dark:text-white">Dovana</h1>
        <label className="label"></label>{' '}
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          type="text"
          required
          placeholder="Pavadinimas"
          className="input text-black dark:text-white"
        />
        <label className="input">
          <Link2Icon className="text-black dark:text-white" />
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            type="text"
            required
            className="grow text-black dark:text-white"
            placeholder="Nuoroda"
          />
        </label>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Aprašymas</legend>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="textarea h-32 text-black dark:text-white"
            placeholder="Aprašymas"
            maxLength={200}
          ></textarea>
          <div className="label">Neprivaloma</div>
        </fieldset>
        <button className="btn btn-primary mt-4 w-full">Patvirtinti</button>
      </form>
    </div>
  );
}
