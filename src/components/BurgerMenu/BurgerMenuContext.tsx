import React, { createContext, useContext, useState } from 'react';
type BurgerMenuContextType = {
	isMenuOpen: boolean
	setIsMenuOpen: (val: boolean) => void
}
const BurgerMenuContext = createContext<BurgerMenuContextType>({} as BurgerMenuContextType);

// Создаем компонент-поставщик контекста
export const BurgerMenuProvider = ({ children }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<BurgerMenuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
			{children}
		</BurgerMenuContext.Provider>
	);
};

// Создаем хук для доступа к состоянию бургер-меню
export const useBurgerMenu = () => {
	return useContext(BurgerMenuContext);
};
