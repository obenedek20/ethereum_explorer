import {useState} from 'react';



/*props should include:
onSubmit = function to handle valid submission
 */
const SearchBar = (props) => {
    const [searchText, setSearchText] = useState("");
    

    

    const onSearchTextChanged = (e) => {
        setSearchText(e.target.value);
    }

    const submitSearch = (e) => {
        e.preventDefault();
        const searchAddress = searchText.trim().toLowerCase();
        if (searchAddress.length !== 42){
            console.log("not an address!");
            return;
        }
        props.setAddress(searchAddress);
        //stub
    };

    return (
        <div>
            <form onSubmit={submitSearch}>
                <div className='input-group'>
                    <input
                        type='text'
                        className='form-control'
                        value={searchText}
                        onChange={onSearchTextChanged}
                    />
                    <button className='btn btn-outline'>
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SearchBar;