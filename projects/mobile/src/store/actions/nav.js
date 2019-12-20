export const NavAction = ({title, search, sort}) => {
    return { type: 'NAV', title: title, search: search, sort: sort }
}