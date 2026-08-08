import { JSX } from "react";
import JoinEventLanding from "../components/JoinEventLanding";
import EventMembership from "../components/EventMembership";
import { useAuth } from "../contexts/AuthContext";

export default function EventsScreen(): JSX.Element {
    const { isMember } = useAuth();

    return (
        isMember ? // devrait être remplacé par une stack ?
            <EventMembership /> :
            <JoinEventLanding />
        
    );
}
