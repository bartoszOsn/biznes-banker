import { IconPencil } from '@tabler/icons-react';
import { ActionIcon, Button, Group, Modal, Stack, TextInput } from '@mantine/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDomainOfType } from '../../domain/useDomainOfType.ts';
import { UserColor } from '../../domain/model/UserColor.ts';
import { UserColorPicker } from '../common/UserColorPicker.tsx';

export function ChangeUsernameAndColorButton() {
	const domain = useDomainOfType('withoutStarting');
	const [modalVisible, setModalVisible] = useState(false);
	const [newUsername, setNewUsername] = useState('');
	const [newColor, setNewColor] = useState<UserColor>(UserColor.BLACK);

	const canSave = useMemo(() => newUsername.length > 0, [newUsername]);
	const save = useCallback(() => {
		domain.changeUsernameAndColor(newUsername, newColor);
		setModalVisible(false);
	}, [domain, newColor, newUsername]);

	useEffect(() => {
		setNewUsername(domain.me.name);
		setNewColor(domain.me.color);
	}, [domain.me.color, domain.me.name, modalVisible]);

	return (
		<>
			<Modal opened={modalVisible} onClose={() => setModalVisible(false)} title='Change Username and Color'>
				<Stack gap='xl'>
					<TextInput label='New name' value={newUsername} onChange={(e) => setNewUsername(e.target.value)}/>
					<UserColorPicker value={newColor} onChange={setNewColor}/>
					<Group gap='xl' align='end'>
						<Button onClick={save} disabled={!canSave}>Save</Button>
					</Group>
				</Stack>
			</Modal>

			<ActionIcon variant="subtle" title="Change username and color" style={{ alignSelf: 'end' }} onClick={() => setModalVisible(true)}>
				<IconPencil size={18} />
			</ActionIcon>
		</>
	)
}