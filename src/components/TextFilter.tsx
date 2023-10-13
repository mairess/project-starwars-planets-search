type TextFilterProps = {
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function TextFilter({ value, onChange }: TextFilterProps) {
  return (
    <>
      <input
        data-testid="name-filter"
        id="name"
        type="text"
        value={ value }
        onChange={ onChange }
      />
      <label htmlFor="name">Serach here</label>
    </>
  );
}

export default TextFilter;
