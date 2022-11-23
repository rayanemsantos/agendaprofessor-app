import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import { useAuthContext } from '../../contexts/AuthContext';
import HomePage from '../../pages/home/HomePage';
import FrequenciaPage from '../../pages/frequencia/FrequenciaPage'
import ClassesPage from '../../pages/classes/Classes'
import { logout } from '../../providers/AuthProvider';
import PerfilPage from '../../pages/perfil/PerfilPage';

const Drawer = createDrawerNavigator();

export default function MenuDrawer() {
    const { signOut } = useAuthContext();

    async function doLogout(){
        try {
            signOut();
            await logout();
        } catch (error) {
            console.log('error', error)
        } 
    };

    return (
      <Drawer.Navigator 
        drawerContent={props => {
            return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem label="Sair" onPress={() => doLogout()} />
            </DrawerContentScrollView>
            )
        }}>
        <Drawer.Screen name="Início" component={HomePage} />
        <Drawer.Screen name="Perfil" component={PerfilPage} />
        <Drawer.Screen name="Aulas" component={ClassesPage} />
        <Drawer.Screen name="Frequencia" component={FrequenciaPage} />
      </Drawer.Navigator>
    );
}