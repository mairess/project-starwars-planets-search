type TextFilterProps = {
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function TextFilter({ value, onChange }: TextFilterProps) {
  return (
    <>
      <label htmlFor="name">Serach here</label>
      <input
        data-testid="name-filter"
        id="name"
        type="text"
        value={ value }
        onChange={ onChange }
      />
    </>
  );
}

export default TextFilter;
