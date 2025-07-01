import { useDomainOfType } from '../../domain/useDomainOfType.ts';
import { UserColor } from '../../domain/model/UserColor.ts';

export function LoginView() {
	const domain = useDomainOfType('withoutUser');

	const colorOptions = [
		UserColor.GREEN,
		UserColor.RED,
		UserColor.BLUE,
		UserColor.YELLOW
	]

	return (
		<div>
			<h1>Login</h1>
			<p>Please enter your username and select a color.</p>
			<form onSubmit={(e) => {
				e.preventDefault();
				const formData = new FormData(e.target as HTMLFormElement);
				const username = formData.get('username') as string;
				const color = formData.get('color') as UserColor;
				domain.setUserProps(username, color);
			}}>
				<input type="text" name="username" placeholder="Username" required />
				<select name="color" required>
					{
						colorOptions.map((option) => {
							return (
								<option key={option} value={option}>
									{option.charAt(0).toUpperCase() + option.slice(1)}
								</option>
							);
						})
					}
				</select>
				<button type="submit">Login</button>
			</form>
		</div>
	);
}