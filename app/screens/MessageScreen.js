import React from 'react';
import { FlatList, Text, View } from 'react-native';
import AppListItem from '../components/AppListItem';
import AppScreen from '../components/AppScreen';
import AppText from '../components/AppText';
import ListItemSeparator from '../components/ListItemSeparator';

function MessageScreen(props) {
    const messages = [
        {
            _id: 1,
            pic: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg",
            title: "Peter Parker",
            message: "Whatsup where are you?"
        },
        {
            _id: 2,
            pic: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
            title: "Bruce Wayne",
            message: "See you tonight!"
        },
        {
            _id: 3,
            pic: "https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Profile-Picture.jpg",
            title: "Iron Man",
            message: "I shall not be seen in the new series."
        },
    ]
    //console.log(messages);
    return (
        <AppScreen style={{
            justifyContent: "flex-start", alignItems: "center",
            backgroundColor: "lightgrey",
        }}>
            <View style={{ flex: 1, width: "100%" }}>
                <FlatList data={messages} keyExtractor={item => item._id}
                    renderItem={({ item }) => {
                        return <AppListItem title={item.title} pic={item.pic} message={item.message} />
                    }}
                    ItemSeparatorComponent={ListItemSeparator}
                />
            </View>
        </AppScreen>
    );
}

export default MessageScreen;