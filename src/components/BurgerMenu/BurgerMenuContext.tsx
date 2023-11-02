import React, { createContext, useContext, useState } from 'react';
type BurgerMenuContextType = {
	isMenuOpen: boolean
	setIsMenuOpen: (val: boolean) => void
}
const BurgerMenuContext = createContext<BurgerMenuContextType>({} as BurgerMenuContextType);
export const BurgerMenuProvider = ({ children }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<BurgerMenuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
			{children}
		</BurgerMenuContext.Provider>
	);
};

export const useBurgerMenu = () => {
	return useContext(BurgerMenuContext);
};
