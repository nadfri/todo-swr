import './CheckBox.scss';

export default function CheckBox({
  className = '',
  ...rest
}: React.ComponentPropsWithoutRef<'input'>) {
  return (
    <input type="checkbox" className={`CheckBox ${className}`} {...rest} />
  );
}
