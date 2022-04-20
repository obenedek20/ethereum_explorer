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
        //prevents page refresh on form submission
        e.preventDefault();

        //addresses are stored in the Moralis database in lowercase, so we must convert our search address to lowercase to make sure
        //that its correctly matched to its transactions
        const searchAddress = searchText.trim().toLowerCase();

        //rudimentary input checking to make sure that the inputted address is the correct length
        if (searchAddress.length !== 42){
            console.log("not an address!");
            return;
        }

        //sets the current watchAddress to the address that we searched for
        props.setAddress(searchAddress);
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